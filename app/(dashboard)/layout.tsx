const Layout = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div className="">
            <div className="flex items-center h-10 bg-white">
                <p className="font-bold text-amber-600">Navbar Dashboard</p>
            </div>
            {children}
        </div>
     );
}
 
export default Layout;