'use client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from 'react';
import { createBrand, getBrand } from '../api/brand';
import { UserContext } from '../context/userContext';
import { uploadFile } from '../util/uploadFile';
function BrandInfomation() {
    const [user, setUser] = useState({} as any);
    const { setNotifi } = useContext(UserContext);
    const [base64image, setBase64image] = useState('');
    // const [brand, setBrand] = useState({} as any);

    const handelSubmit = async () => {
        const newUser = { ...user };
        if (newUser.imageOrigin) {
            newUser.image = await uploadFile(newUser.imageOrigin);
            console.log(newUser.image);
        }
        const res = await createBrand(newUser);
        if (!res?.success) {
            setNotifi({ message: res?.message, type: 'error' });
            return;
        }
        setNotifi({ message: res?.message, type: 'success' });
    };

    const onChangeBrand = (key: string, value: string) => {
        const newUser = { ...user };
        newUser[key] = value;
        setUser(newUser);
    };

    const loadDataBrand = async () => {
        let user: any = localStorage.getItem('user');
        if (!user) return;
        user = JSON.parse(user);
        const brand: any = await getBrand(user.customerId);
        setUser({ ...brand?.data, role: user.role });
        setBase64image(brand?.data?.image);
    };

    const onChangeFile = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event: any) {
            setBase64image(event.target.result.toString());
        };
        reader.readAsDataURL(file);
        setUser((user: any) => ({ ...user, imageOrigin: file }));
    };

    useEffect(() => {
        loadDataBrand();
    }, []);
    console.log(user);

    if (!user || user?.role !== 'ROLE_BRAND_OWNER') return <></>;
    return (
        <>
            <div className="align-center mt-3 mx-7 w-[900px] ">
                <div className="border bg-white rounded-lg p-8">
                    <div className="text-3xl text-center font-semibold pb-4">Thông tin nhà xe</div>
                    <h4>
                        {' '}
                        Tên nhà xe
                        <Form.Control
                            className="w-96"
                            size="lg"
                            type="text"
                            placeholder="Tên nhà xe"
                            value={user.name}
                            onChange={(event: any) => onChangeBrand('name', event?.target.value)}
                        />
                    </h4>
                    <br />
                    <h4>
                        {' '}
                        Địa chỉ
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Địa chỉ"
                            value={user.address}
                            onChange={(event: any) => onChangeBrand('address', event?.target.value)}
                        />
                    </h4>
                    <br />
                    <h4>
                        Số điện thoại
                        <Form.Control
                            size="lg"
                            type="number"
                            placeholder="Số điện thoại"
                            value={user.phone}
                            onChange={(event: any) => onChangeBrand('phone', event?.target.value)}
                        />
                    </h4>
                    <br />
                    <h4>
                        Mô tả
                        <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Mô tả"
                            value={user.description}
                            onChange={(event: any) => onChangeBrand('description', event?.target.value)}
                        />
                    </h4>
                    <br />

                    <Form.Label>Chọn ảnh</Form.Label>
                    <Form.Control type="file" size="lg" onChange={onChangeFile} />
                    <br />
                    {base64image && (
                        <img
                            style={{
                                width: '200px',
                                marginTop: '10px',
                                marginLeft: '140px',
                            }}
                            alt="avatar"
                            src={base64image}
                        />
                    )}
                    <br />
                    <Button variant="primary" type="submit" onClick={handelSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </>
    );
}

export default BrandInfomation;
