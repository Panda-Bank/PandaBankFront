import { handleChangePage } from '../../libs/tools'
import { EButton } from '../Button'
import styles from './styles.module.scss'
import logo from '../../public/assets/panda-logo.png'
import Image from 'next/image'

export function NavBar() {
    return <header className={styles['header']}>
        <span className={styles['header-inner']}>
            <div className={styles['logo-container']}>
                <Image  src={logo}/>
            </div>
            <div onClick={() => handleChangePage('/')}>
                <h1 className={styles['middle-inner']}>PANDA</h1>
                <p className={`${styles['caption']} text-zinc-300 text-lg`}>Bank.</p>
            </div>
            <nav>
                <ul className={styles['nav-container']}>
                    <EButton variant="outline" onClick={() => handleChangePage('login')}>
                        Log in
                    </EButton>
                    <EButton onClick={() => handleChangePage('register')}>Join now</EButton>
                </ul>
            </nav>
        </span>
    </header>
}