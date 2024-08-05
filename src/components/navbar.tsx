'use client';
import { Container, Navbar } from 'react-bootstrap';
import { IoHomeSharp } from 'react-icons/io5';
import { FaRoute } from 'react-icons/fa6';
import { GoClock } from 'react-icons/go';
import { MdLocalParking } from 'react-icons/md';
import { FaBus } from 'react-icons/fa';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { HiTicket } from 'react-icons/hi2';
import { IoReceipt } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';
import { TbBusStop } from 'react-icons/tb';
import Link from '@mui/material/Link';

const NavBarSide = () => {
    const navItems = [
        { id: 1, name: 'Thông tin nhà xe', link: '/brand-owner', icon: '🚌' },
        { id: 2, name: 'Quản lý tuyến xe', link: '/brand-owner/route', icon: '🛣️' },
        { id: 3, name: 'Khung giờ xe chạy', link: '/brand-owner/shuttle', icon: '🕒' },
        { id: 4, name: 'Quản lí điểm đón trả', link: '/brand-owner/parking', icon: '📍' },
        { id: 5, name: ' Quản lý xe', link: '/brand-owner/bus', icon: '🚍 ' },
        { id: 6, name: 'Album ảnh', link: '/album', icon: '📸' },
        { id: 7, name: ' Lịch trình', link: '/brand-owner/schedule', icon: '📅' },
        { id: 8, name: ' Quản lý vé', link: '/brand-owner/ticket', icon: '🎫' },
        { id: 9, name: ' Quản lý đơn đặt', link: '/brand-owner/order', icon: '📦' },
        { id: 10, name: 'Thông tin tài khoản', link: '/account', icon: '👤' },
        { id: 11, name: ' Đăng xuất', link: '/logout', icon: '🚪' },
    ];
    return (
        <>
            <div className="rounded-lg shadow-2xl  bg-white">
                <nav className="bg-gray-100 w-64 h-screen p-3 mt">
                    <ul className="space-y-4">
                        {navItems.map((item) => (
                            <li key={item.id} className="flex items-center space-x-2">
                                <span>{item.icon}</span>
                                <Link href={item.link}>
                                    <a className="text-gray-700 hover:text-blue-500">{item.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* <Navbar className=" rounded-full justify-center ml-6 mt-[-5px]">
                    <IoHomeSharp />
                    <Navbar.Brand href="/brand-owner">Thông tin nhà xe</Navbar.Brand>
                </Navbar>

                <Navbar style={{ marginTop: '-15px' }} className="rounded-full  justify-center ml-6 mt-[-5px]">
                    <FaRoute />
                    <Navbar.Brand href="/brand-owner/route">Quản lý tuyến xe</Navbar.Brand>
                </Navbar>

                <Navbar style={{ marginTop: '-15px' }} className="rounded-full  justify-center ml-6">
                    <GoClock />
                    <Navbar.Brand href="/brand-owner/shuttle">Khung giờ xe chạy</Navbar.Brand>
                </Navbar>

                <Navbar style={{ marginTop: '-15px' }} className="rounded-full  justify-center  ml-6">
                    <TbBusStop />
                    <Navbar.Brand href="/brand-owner/parking">Quản lí điểm đón trả</Navbar.Brand>
                </Navbar>

                <Navbar style={{ marginTop: '-15px' }} className="rounded-full  justify-center  ml-6">
                    <FaBus />
                    <Navbar.Brand href="/brand-owner/bus">Quản lý xe</Navbar.Brand>
                </Navbar>
                <div className="text-xl text-left font-bold p-2">Chuyến xe</div>
                <Navbar style={{ marginTop: '-15px' }} className="rounded-full  justify-center  ml-6">
                    <RiCalendarScheduleLine />
                    <Navbar.Brand href="/brand-owner/schedule">Lịch trình</Navbar.Brand>
                </Navbar>

                <Navbar style={{ marginTop: '-15px' }} className="rounded-full  justify-center  ml-6">
                    <HiTicket />
                    <Navbar.Brand href="/brand-owner/ticket">Quản lý vé</Navbar.Brand>
                </Navbar>

                <Navbar style={{ marginTop: '-15px' }} className="rounded-full justify-center ml-6">
                    <IoReceipt />
                    <Navbar.Brand href="/brand-owner/order">Quản lý đơn đặt</Navbar.Brand>
                </Navbar>
                <div className="text-xl text-left font-bold p-2">Tài khoản</div>
                <Navbar style={{ marginTop: '-15px' }} className="rounded-full justify-center ml-6">
                    <IoIosLogOut />
                    <Navbar.Brand href="/logout">Đăng xuất</Navbar.Brand>
                </Navbar> */}
            </div>
        </>
    );
};

export default NavBarSide;
