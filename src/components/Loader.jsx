const Loader = () => {
    return (
        <div className="flex h-[100%] justify-center items-center">
            <div className="w-full gap-x-3 flex justify-center items-center">
                <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:200ms]"></div>
                <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:400ms]"></div>
            </div>
        </div>
    );
};

export default Loader;
