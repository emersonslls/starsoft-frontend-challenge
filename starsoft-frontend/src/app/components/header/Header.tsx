/* <---- IMAGE ----> */
import Image from 'next/image';

/* <---- SCSS ----> */
import '../../styles/components/_header.scss';

export function Header() {
  return (
    <header className="header">
      <Image
        src="/assets/logo.svg"
        alt="Logo"
        width={54}
        height= {33}
        className="Logo"
      />
      <div className='container-bag'>
        <div className='container-icon'>
           <Image
          src="/assets/Icons/Bag.svg"
          alt="Bag"
          width={30}
          height={30}
          className="BagIcon"
        />
        </div>
       
        <p>0</p>
      </div>
    </header>
  );
}
