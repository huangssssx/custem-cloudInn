"use client";

import { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import useRantModal from "@/app/hooks/useRantModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../Input/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../Input/CountrySelect";
import Map from "../Map";
import dynamic from "next/dynamic";
import Counter from "../Input/Counter";
import ImageUpload from "../Input/ImageUpload";
import Input from "../Input/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const RantModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const rantModal = useRantModal();
  const router = useRouter();
  enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
  }

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    console.log(STEPS.PRICE)
    if(step !== STEPS.PRICE){
      return onNext();
    }

    setIsLoading(true);
    axios.post("/api/listings",data).then(()=>{
      toast.success("Listing Created!");
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      rantModal.onClose();
    }).catch(()=>{
      toast.error("Something went wrong");
    }).finally(()=>{
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create ";
    }

    return "Next";
  }, [step, STEPS.PRICE]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step, STEPS.CATEGORY]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      ></Heading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => {
                setCustomValue("category", category);
              }}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            ></CategoryInput>
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located? "
          subtitle="Help guest find you!"
        ></Heading>
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        ></CountrySelect>
        <Map center={location?.latlng}></Map>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Show some basics about your place"
          subtitle="What amenities do you have? "
        ></Heading>

        <Counter
          title="Guest"
          subtitle="How many guest do you allow?"
          value={guestCount}
          onChange={(value) => {
            setCustomValue("guestCount", value);
          }}
        ></Counter>

        <Counter
          title="Rooms"
          subtitle="How many room do you have?"
          value={roomCount}
          onChange={(value) => {
            setCustomValue("roomCount", value);
          }}
        ></Counter>

        <Counter
          title="Bathrooms"
          subtitle="How many bathroom do you have?"
          value={bathroomCount}
          onChange={(value) => {
            setCustomValue("bathroomCount", value);
          }}
        ></Counter>
      </div>
    );
  }

  if(step === STEPS.IMAGES){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Add a photo of your place" subtitle="Show guest what your place look like!"></Heading>
        <ImageUpload value={imageSrc} onChange={(imageSrc)=>setCustomValue("imageSrc",imageSrc)}></ImageUpload>
      </div>
    );
  }

  if(step === STEPS.DESCRIPTION){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="How would you describe your place?"
        subtitle="Short and sweet work best!"
        ></Heading>
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        ></Input>
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        ></Input>
      </div>
    )
  }

  if(step === STEPS.PRICE){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Now, set your price?"
        subtitle="How much do you charge per night?"
        ></Heading>
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        ></Input>
      </div>
    )
  }

  const footerContent = <div></div>;
  return (
    <Modal
      disabled={isLoading}
      isOpen={rantModal.isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rantModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    ></Modal>
  );
};
export default RantModal;
