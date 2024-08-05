import Image from 'next/image';
import facenookImg from '../../public/facebook.png';
import instagramImg from '../../public/instagram.png';
import telegramImg from '../../public/telegram.png';
import youtubeImg from '../../public/youtube.png';
import socialImg from '../../public/social.png';
const AppFooter = () => {
    return (
        <div>
            <div className="bg-[#f3f3f3] text-[#767676] mt text-left px-5 lg:px-20">
                <div className="container">
                    <div className="py-3 flex justify-between">
                        <div className="px-4">
                            <h1 className="pb-3 text-lg font-semibold text-[#4D4D4D]">Về chúng tôi</h1>
                            <div className="flex space-x-3">
                                <a href="https://www.facebook.com/tna.240401/">
                                    <Image src={facenookImg} alt="facebook" width="32" height="32" />
                                </a>
                                <a href="https://www.instagram.com/_ahnn.24_/">
                                    <Image src={instagramImg} alt="facebook" width="32" height="32" />
                                </a>

                                <div className="has-tooltip">
                                    <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8">
                                        thamngocanh2441@gmail.com
                                    </span>
                                    <Image src={socialImg} alt="facebook" width="32" height="32" />
                                </div>
                                <a href="https://web.telegram.org/k/">
                                    <Image src={telegramImg} alt="facebook" width="32" height="32" />
                                </a>
                                <a href="https://www.youtube.com/">
                                    <Image src={youtubeImg} alt="facebook" width="32" height="32" />
                                </a>
                            </div>
                        </div>
                        <div className="px-4 col-span-3">
                            <h1 className="pb-5 text-lg font-semibold text-[#4D4D4D]">Hỗ trợ</h1>
                            <p className="mb-2 hover:text-[#40a9ff]">Hướng dẫn thanh toán</p>
                            <p className="mb-2 hover:text-[#40a9ff]">Quy chế</p>
                            <p className="mb-2 hover:text-[#40a9ff]">Chính sách bảo mật thông tin</p>
                            <p className="mb-2 hover:text-[#40a9ff]">Chính sách bảo mật thanh toán</p>
                            <p className="mb-2 hover:text-[#40a9ff]">
                                Chính sách và quy trình giải quyết <br />
                                tranh chấp, khiếu nại
                            </p>
                            <p className="mb-2 hover:text-[#40a9ff]">Câu hỏi thường gặp</p>
                            <p className="mb-2 hover:text-[#40a9ff]">Tra cứu đơn hàng</p>
                        </div>
                        <div className="px-4 col-span-3">
                            <h1 className="pb-5 text-lg font-semibold text-[#4D4D4D]">Chứng nhận</h1>
                            
                        </div>
                        <div className="px-4 col-span-3">
                            <h1 className="pb-5 text-lg font-semibold text-[#4D4D4D]">Tải ứng dụng</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-10 text-center text-[#767676] bg-white">
                <h2 className="font-semibold text-[#4D4D4D]">Website VEXERE PTITHCM</h2>
                <p>Địa chỉ: 97 Man Thiện, Phường Hiệp Phú, Quận 9, TP. Hồ Chí Minh, Việt Nam</p>
                <p>Bản quyền &copy; 2023 AnhPTITHCM</p>
            </div>
        </div>
    );
};

export default AppFooter;
