"use client"
import { SafeUser } from '@/app/types';
import Container from '../Container';
import Logo from './Logo';
import SEARCH from './Search';
import UserMenu from "./UserMenu";
import Categories from './Categories';

interface NavbarProps{
  currentUser ?: SafeUser | null |undefined;
}


const Navbar:React.FC<NavbarProps> = ({
  currentUser 
}) => {
  const url = "https://www.bilibili.com/video/BV1To4y1V71c/?spm_id_from=333.788.recommend_more_video.0";
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
     <div className='py-4 border-b-[1px]'>
        <Container>
            <div className='flex flex-row items-center justify-between gap-4 md:gap-0'>
                <Logo ></Logo>
                <SEARCH/>
                <UserMenu currentUser={currentUser}/>
            </div>
        </Container>
     </div>
     <Categories></Categories>
    </div>
  );
};
export default Navbar;

