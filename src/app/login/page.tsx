'use client';
import { useContext, useState } from 'react';
import { Image } from '@nextui-org/image';
import { Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation'
import { loginApi } from '../api/auth/login';
import { UserContext } from '../context/userContext';

const Login = () => {

    const [userLogin,setUserLogin] = useState({phoneNumber:'',password:''})
    const { setNotifi,setUser } = useContext(UserContext);

    const router = useRouter()

    const handleLogin =async ()=>{
        try{
            const res = await loginApi(userLogin)
            console.log(res);
            if(res?.success){
                localStorage.setItem('user', JSON.stringify(res.data))
                setUser(res.data)
                setNotifi({message:"Đăng nhập thành công!",type:'success'})
                router.push('/brand-owner')
                return
            }else {
                setNotifi({ message: "Đã xảy ra lỗi!", type: 'error' });
            }
        
        }
        catch(error){
            console.error("Login error:", error);
            setNotifi({ message: "Đã xảy ra lỗi!", type: 'error' });
            return
        }        
    }
    return (
        <>
            <div className="flex justify-between px-8 py-6 h-[100%] rounded-lg">
                <div className="w-[60%]">
                    <Image
                        width={760}
                        height={900}
                        alt=""
                        // src="https://static.vecteezy.com/system/resources/previews/005/962/374/non_2x/illustration-graphic-cartoon-character-of-login-vector.jpg"
                        src="https://www.go.ooo/img/bg-img/Login.jpg"
                    />
                </div>

                <div className="w-[40%] flex items-center p-10 border-gray-400 rounded-lg shadow-2xl shadow-neutral-800">
                    <form className="w-full">
                        <p className="text-center font-medium text-4xl mb-10">Vexere Xin chào</p>
                        <div className="mb-4 ">
                            <label>Tên đăng nhập</label>
                            <div className=" ">
                                <Input
                                    isRequired
                                    isClearable
                                    label="Số điện thoại"
                                    variant="bordered"
                                    // defaultValue="junior@nextui.org"
                                    onClear={() => console.log('input cleared')}
                                    className="w-full"
                                    value={userLogin.phoneNumber}
                                    onChange={(event: any)=>setUserLogin({...userLogin,phoneNumber:event?.target.value})}
                                />
                            </div>
                        </div>
                        <div className="mb-2 ">
                            <label>Mật khẩu</label>
                            <div>
                                <Input
                                    isRequired
                                    label="Password"
                                    variant="bordered"
                                    defaultValue="123456"
                                    className="w-full"
                                    value={userLogin.password}
                                    onChange={(event: any)=>setUserLogin({...userLogin,password:event?.target.value})}
                                    // endContent={
                                    //     <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                    //       {isVisible ? (
                                    //         <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    //       ) : (
                                    //         <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    //       )}
                                    //     </button>
                                    //   }
                                    // type={isVisible ? 'text' : 'password'}
                                />
                            </div>
                        </div>
                        <div>
                            <button>Quên mật khẩu</button>
                        </div>
                        <button className="mt-[5%] text-[aliceblue] bg-[#1b2b36] w-full h-9 rounded-md cursor-pointer" onClick={handleLogin}>
                            Đăng nhập
                        </button>
                        <hr />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
