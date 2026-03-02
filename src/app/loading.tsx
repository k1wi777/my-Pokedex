export default function LoadingPage(){
    return(
        <div className=" h-lvh flex justify-center items-center">

            <section className="w-1/4 text-center space-x-1  animate-pulse flex flex-col items-center">
                <img src="/pokeball-color.svg" alt="loading image" className="w-[75%] duration-200 ease-in animate-spin opacity-15" />
                <h1 className="text-4xl font-black opacity-70">loading...</h1>
            </section>
        </div>
    )
}