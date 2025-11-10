import Link from "next/link";

const Users = () => {
    return ( 
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-500">
                User Page
            </h1>
            <div className="flex">
                <ul>
                <li className="text-semibold"><Link href={'/dashboard/users/1'}>User 1</Link></li>
                <li className="text-semibold"><Link href={'/dashboard/users/2'}>User 2</Link></li>
                <li className="text-semibold"><Link href={'/dashboard/users/3'}>User 3</Link></li>
            </ul>
            </div>
        </div>
     );
}
 
export default Users;