import Link from 'next/link'

const DemoEndPage = () => {
    return (
        <div className=" ">
            <div className="w-screen h-scree flex flex-col items-center mt-12">
                <div className="text-4xl font-bold text-white mb-6">
                    DEMO END
                </div>
                <Link href="/">
                    <button
                        type="button"
                        className="w-48 p-2 bg-sky-500 text-white rounded-xl font-primary font-semibold text-xl flex
                       justify-center items-baseline  hover:bg-sky-600"
                    >
                        Top
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default DemoEndPage
