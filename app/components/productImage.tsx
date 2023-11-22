import { useState, useRef } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function ProductImage({ images }: { images: string[] }) {
    const [mainImg, setMainImg] = useState(images[0])
    const ref = useRef()

    return (
        <div className="w-full md:w-1/2 max-w-md border border-palette-lighter bg-white rounded-lg shadow-lg">
            <div className="relative h-96">
                <Image
                    src={mainImg}
                    alt={mainImg}
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className="relative flex border-t border-palette-lighter">
                <button
                    aria-label="left-scroll"
                    className="h-32 bg-palette-lighter hover:bg-palette-light  absolute left-0 z-10 opacity-75"
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="w-3 mx-1 text-palette-primary"
                    />
                </button>
                <div
                    style={{ scrollBehavior: 'smooth' }}
                    className="flex space-x-1 w-full overflow-auto border-t border-palette-lighter"
                >
                    {images.map((imgItem, index) => (
                        <button
                            key={index}
                            className="relative w-40 h-32 flex-shrink-0 rounded-sm "
                            onClick={() => setMainImg(imgItem)}
                        >
                            <Image
                                src={imgItem}
                                alt={imgItem}
                                layout="fill"
                                objectFit="contain"
                                className=""
                            />
                        </button>
                    ))}
                </div>
                <button
                    aria-label="right-scroll"
                    className="h-32 bg-palette-lighter hover:bg-palette-light  absolute right-0 z-10 opacity-75"
                    // onClick={() => scroll(300)}
                >
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="w-3 mx-1 text-palette-primary"
                    />
                </button>
            </div>
        </div>
    )
}

export default ProductImage
