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
        <Image
          src="/assets/Icons/Bag.svg"
          alt="Bag"
          width={33}
          height={33}
          className="BagIcon"
        />
        <p>0</p>
      </div>
    </header>
  );
}
