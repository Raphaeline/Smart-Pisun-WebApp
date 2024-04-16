import React from "react";

const Navbar = ({ isDashboardPage, isProdukPage, isAdminPage }: { isDashboardPage: boolean; isProdukPage: boolean; isAdminPage: boolean }) => {
	return (
		<nav className="w-[200px] xl:w-[250px] fixed bg-white top-0 left-0 right-0 min-h-full shadow-xl">
			<div className="flex p-[20px]">
				<div className="m-[10px] w-[50px]">
					<img src="/Logo1.svg" alt="My Image" />
				</div>
				<div className="m-[6px] 2xl:m-[10px] flex flex-col">
					<p className="text-[#0D6D8C] text-[14px] 2xl:text-[18px] font-jakarta font-semibold tracking-[5.6px]">TuBi</p>
					<p className="text-[#0D6D8C] text-[16px] 2xl:text-[20px] font-jakarta font-semibold whitespace-nowrap overflow-hidden">Manajer Toko</p>
				</div>
			</div>
			<ul>
				<li>
					<a className="flex px-[28px] py-[14px] 2xl:py-[20px]" href="/dashboard">
						<img src={isDashboardPage ? "/dashboard_blue.svg" : "/dashboard.svg"} alt="Dashboard" className="w-[18px] 2xl:w-[28px]" />
						<p className={isDashboardPage ? "text-[#25B6D0] font-poppins text-[16px] 2xl:text-[20px] px-[6px]" : "text-[#000000] font-poppins text-[16px] 2xl:text-[20px] px-[6px]"}>Dasboard</p>
					</a>
				</li>
				<li>
					<a className="flex px-[28px] py-[14px] 2xl:py-[20px]" href="/produk">
						<img src={isProdukPage ? "/produk_blue.svg" : "/produk.svg"} alt="Produk" className="w-[18px] 2xl:w-[28px]" />
						<p className={isProdukPage ? "text-[#25B6D0] font-poppins text-[16px] 2xl:text-[20px] px-[6px]" : "text-[#000000] font-poppins text-[16px] 2xl:text-[20px] px-[6px]"}>Produk</p>
					</a>
				</li>
				<li>
					<a className="flex px-[28px] py-[14px] 2xl:py-[20px]" href="/admin">
						<img src={isAdminPage ? "/admin_blue.svg" : "/admin.svg"} className="w-[18px] 2xl:w-[28px]" />
						<p className={isAdminPage ? "text-[#25B6D0] font-poppins text-[16px] 2xl:text-[20px] px-[6px]" : "text-[#000000] font-poppins text-[16px] 2xl:text-[20px] px-[6px]"}>Admin</p>
					</a>
				</li>
				<li>
					<a className="flex px-[28px] py-[14px] 2xl:py-[20px]" href="#">
						<img src="/bantuan.svg" alt="Dashboard" className="w-[18px] 2xl:w-[28px]" />
						<p className="text-[#000000] font-poppins text-[16px] 2xl:text-[20px] px-[6px]">Bantuan</p>
					</a>
				</li>
				<div className="flex px-[28px] py-[14px] 2xl:py-[20px]">
					<a className=" bg-[#FF5C5C] hover:bg-[#FF5C5C] py-[9px] 2xl:py-[12px] px-[22px] 2xl:px-[30px] rounded-md font-poppins text-[14px] 2xl:text-[16px] drop-shadow hover:drop-shadow-md hover:shadow-lg" href="/">
						Logout
					</a>
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;
