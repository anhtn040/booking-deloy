'use client'
import { useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "../app/style/customer.css"
interface Iprops {
    showModal: boolean;
    setShowModal: (value: boolean) => void
}
function LoginModal(props: Iprops) {
    const { showModal, setShowModal } = props;
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [usernameSignup, setUsernameSignup] = useState<string>("")
    const [passwordSignup, setPasswordSignup] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            console.log("value:", username, password)
        }
        setValidated(true);
    };
    const handleSubmitSignUp = () => {

    }
    return (
        <>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton style={{ 'border': '0' }}>
                    {/* <Modal.Title className="text-center">Login</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        // activeKey={key}
                        className="mb-3"
                    >
                        <Tab eventKey="Login" title="Đăng nhập">
                            <Form validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control type="text" placeholder="Type your number phone"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid state.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control type="password" placeholder="Type password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid state.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="btnLogin">
                                    <Button variant="primary" type="submit" style={{ 'width': '40%' }}>Login</Button>
                                    <div className="mt-2 border-b-1">Fot got password?</div>
                                </div>
                            </Form>
                        </Tab>
                        <Tab eventKey="signup" title="Đăng ký">
                            <Form validated={validated} onSubmit={handleSubmitSignUp}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control type="number" placeholder="Type your number phone"
                                        value={usernameSignup}
                                        onChange={(e) => setUsernameSignup(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid state.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Họ tên</Form.Label>
                                    <Form.Control type="text" placeholder="Type name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid state.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Type email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid state.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control type="password" placeholder="Type password"
                                        value={passwordSignup}
                                        onChange={(e) => setPasswordSignup(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid state.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                                    <Form.Control type="password" placeholder="Type password"
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid state.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="btnLogin">
                                    <Button variant="primary" type="submit" style={{ 'width': '40%' }}>Đăng ký</Button>
                                </div>
                            </Form>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default LoginModal;


