const User = async ({params}: {params: Promise<{id: String}>}) => {
    const {id} = await params;
    return ( 
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl font-bold text-gray-500">
                User - {id}
            </h1>
            <div className="text-2xl">
                This is the page for the user {id}
            </div>
        </div>
     );
}
 
export default User;