import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

function BackToProductButton() {
    return (
        <Link href="/">
            <div
                aria-label="back-to-products"
                className="border border-white text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
      justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-grey-200 rounded-md"
            >
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="w-4 mr-4 inline-flex"
                />
                Back To Home
            </div>
        </Link>
    )
}

export default BackToProductButton
