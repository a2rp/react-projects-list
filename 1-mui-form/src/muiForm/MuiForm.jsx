import React from 'react';
import { Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';

const MuiForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [fullName, setFullName] = useState("");
    const [fullNameError, setFullNameError] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");

    const [url, setUrl] = useState("");
    const [urlError, setUrlError] = useState("");

    const [resume, setResume] = useState("");
    const resumeInputFileRef = useRef(null);

    const [gender, setGender] = useState("male");

    const [subject, setSubject] = useState({
        english: true,
        maths: false,
        physics: false,
    });

    const [programmingLanguage, setProgrammingLanguage] = useState("react");


    const handleSubjectChange = (event) => {
        setSubject({ ...subject, [event.target.name]: event.target.checked, });
    };

    const handlleFullNameChange = (event) => {
        const regex = /[^a-zA-Z ]/ig;
        const value = event.target.value.replace(regex, "").slice(0, 20);
        setFullName(value);
        if (value.length < 3) {
            setFullNameError("Min: 3 Char, Max: 20  Char, A-Za-z");
        } else {
            setFullNameError("");
        }
    };

    const handlleEmailChange = (event) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const isValid = regex.test(event.target.value);
        setEmail(event.target.value.substring(0, 40));
        if (!isValid) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };

    const handleUserNameChange = (event) => {
        const regex = /[^a-zA-Z0-9]/ig;
        const value = event.target.value.replace(regex, "").slice(0, 20);
        setUserName(value);
        if (value.length < 3) {
            setUserNameError("Min: 3 Char, Max: 20  Char, A-Za-z");
        } else {
            setUserNameError("");
        }
    };

    const handlePasswordChange = (event) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isValid = regex.test(event.target.value);
        setPassword(event.target.value.substring(0, 15));
        if (!isValid) {
            setPasswordError("Size: [8-15] chars, 1 uppercase, 1 lowercase, 1 number and 1 special character required");
        } else {
            setPasswordError("");
        }
    };

    const handlePhoneNumberChange = (event) => {
        const regex = /[^0-9]/ig;
        const value = event.target.value.replace(regex, "").slice(0, 10);
        setPhoneNumber(value);
        if (value.length !== 10) {
            setPhoneNumberError("Size: 10  Chars, 0-9");
        } else {
            setPhoneNumberError("");
        }
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            const inputData = { fullName, email, userName, password, phoneNumber, url, resume, gender, subject, programmingLanguage };
            if (fullNameError.length > 0 || emailError.length > 0 || passwordError.length > 0 || phoneNumberError.length > 0 || urlError.length > 0) {
                return toast.error("Form contains error");
            }

            if (resume.length === 0) {
                return toast.error("Please add your resume")
            }
            console.log(inputData);
            handleClickOpen();
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000 * 3);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Material UI Form</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.section1}>
                    <TextField
                        className={styles.textField}
                        value={fullName}
                        onChange={handlleFullNameChange}
                        label="Fullname"
                        placeholder="Fullname"
                        error={fullNameError.length > 0}
                        helperText={fullNameError.length > 0 ? fullNameError : ""}
                        required
                    />

                    <TextField
                        className={styles.textField}
                        value={email}
                        onChange={handlleEmailChange}
                        label="Email"
                        placeholder="Email"
                        error={emailError.length > 0}
                        helperText={emailError.length > 0 ? emailError : ""}
                        required
                        type="email"
                    />

                    <TextField
                        className={styles.textField}
                        value={userName}
                        onChange={handleUserNameChange}
                        label="User Name"
                        placeholder="User Name"
                        error={userNameError.length > 0}
                        helperText={userNameError.length > 0 ? userNameError : ""}
                        required
                    />

                    <TextField
                        className={styles.textField}
                        value={password}
                        onChange={handlePasswordChange}
                        label="Password"
                        placeholder="Password"
                        error={passwordError.length > 0}
                        helperText={passwordError.length > 0 ? passwordError : ""}
                        required
                        type="password"
                    />

                    <TextField
                        className={styles.textField}
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        label="Phone number"
                        placeholder="Phone number"
                        error={phoneNumberError.length > 0}
                        helperText={phoneNumberError.length > 0 ? phoneNumberError : ""}
                        required
                    />

                    <TextField
                        className={styles.textField}
                        value={url}
                        onChange={event => setUrl(event.target.value)}
                        label="URL"
                        placeholder="URL"
                        error={urlError.length > 0}
                        helperText={urlError.length > 0 ? urlError : ""}
                        required
                        type="url"
                    />
                </div>

                <div className={styles.section2}>
                    <FormControl>
                        <FormLabel id="gender-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="gender-buttons-group-label"
                            defaultValue="male"
                            name="radio-buttons-group"
                            value={gender}
                            onChange={event => setGender(event.target.value)}
                        >
                            <Box sx={{ display: "flex", paddingLeft: "30px" }}>
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </Box>
                        </RadioGroup>
                    </FormControl>

                    <FormControl
                        required
                        component="fieldset"
                        variant="standard"
                    >
                        <FormLabel component="legend">Pick subject</FormLabel>
                        <FormGroup>
                            <Box sx={{ display: "flex", paddingLeft: "30px" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={subject.english}
                                            onChange={handleSubjectChange}
                                            name="english"
                                        />
                                    }
                                    label="English"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={subject.maths}
                                            onChange={handleSubjectChange}
                                            name="maths"
                                        />
                                    }
                                    label="Maths"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={subject.physics}
                                            onChange={handleSubjectChange}
                                            name="physics"
                                        />
                                    }
                                    label="Physics"
                                />
                            </Box>
                        </FormGroup>
                    </FormControl>
                </div>

                <div className={styles.section3}>
                    <div className={styles.selectResumeContainer}>
                        <Typography>Select resume</Typography>
                        <br />
                        <TextField
                            ref={resumeInputFileRef}
                            className={styles.resumeInputFile}
                            type="file"
                            placeholder="select your resume"
                            value={resume}
                            onChange={event => setResume(event.target.value)}
                        />
                    </div>

                    <Select
                        className={styles.programmingLanguage}
                        label="Select programming language"
                        value={programmingLanguage}
                        onChange={event => setProgrammingLanguage(event.target.value)}
                    >
                        <Typography className={styles.languageTypography}
                            sx={{ fontWeight: 700, paddingLeft: "15px" }}
                        >Language set 1</Typography>
                        <MenuItem
                            value={"react"} selected
                            className={styles.language}
                        >React.js</MenuItem>
                        <MenuItem
                            value={"node"}
                            className={styles.language}
                        >Node.js</MenuItem>

                        <Typography className={styles.languageTypography}
                            sx={{ fontWeight: 700, paddingLeft: "15px" }}
                        >Language set 2</Typography>
                        <MenuItem
                            value={"express"}
                            className={styles.language}
                        >Express.js</MenuItem>
                        <MenuItem
                            value={"mongodb"}
                            className={styles.language}
                        >MongoDB</MenuItem>
                    </Select>
                </div>

                <br /><br />
                <Button
                    variant="contained"
                    type="submit"
                    disabled={isLoading}
                    className={styles.submitButton}
                >
                    {isLoading
                        ? <CircularProgress sx={{ padding: "10px" }} />
                        : "Submit"}
                </Button>
            </form>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Form inputs"}
                    <span style={{ float: "right" }}><CloseIcon onClick={handleClose} /></span>
                </DialogTitle>
                <DialogContent className={styles.dialogContent}>
                    <DialogContentText id="alert-dialog-description">
                        Undegiven are the details you inserted in the form.
                        <br />
                        <span className={styles.detail} style={{ display: "block" }}>
                            <span className={styles.detailTitle}
                                style={{ display: "block", fontWeight: "bold", marginTop: "10px" }}
                            >Fullname:</span>
                            {fullName}
                        </span>
                        <span className={styles.detail} style={{ display: "block" }}>
                            <span className={styles.detailTitle}
                                style={{ display: "block", fontWeight: "bold", marginTop: "10px" }}
                            >Email:</span>
                            {email}
                        </span>
                        <span className={styles.detail} style={{ display: "block" }}>
                            <span className={styles.detailTitle}
                                style={{ display: "block", fontWeight: "bold", marginTop: "10px" }}
                            >
                                Username:</span> {userName}
                        </span>
                        <span className={styles.detail} style={{ display: "block" }}>
                            <span className={styles.detailTitle}
                                style={{ display: "block", fontWeight: "bold", marginTop: "10px" }}
                            >Password:</span>
                            {password}
                        </span>
                        <span className={styles.detail} style={{ display: "block" }}>
                            <span className={styles.detailTitle}
                                style={{ display: "block", fontWeight: "bold", marginTop: "10px" }}
                            >Phone number:</span> {phoneNumber}
                        </span>
                        <span className={styles.detail} style={{ display: "block" }}>
                            <span className={styles.detailTitle}
                                style={{ display: "block", fontWeight: "bold", marginTop: "10px" }}
                            >URL:</span>
                            {url}
                        </span>
                        <span className={styles.detail} style={{ display: "block" }}>
                            <span className={styles.detailTitle}
                                style={{ display: "block", fontWeight: "bold", marginTop: "10px" }}
                            >Resume:</span>
                            {resume}
                        </span>
                        <span className={styles.detail} style={{ display: "block" }}>
                            <span className={styles.detailTitle}
                                style={{ display: "block", fontWeight: "bold", marginTop: "10px" }}
                            >Gender:</span>
                            {gender}
                        </span>
                        <span className={styles.detail} style={{ display: "block" }}>
                            <span className={styles.detailTitle}
                                style={{ display: "block", fontWeight: "bold", marginTop: "10px" }}
                            >Subject:</span>
                            {subject.english && "English"} &nbsp;
                            {subject.maths && "Maths"} &nbsp;
                            {subject.physics && "Physics"}
                        </span>
                        <span className={styles.detail} style={{ display: "block" }}>
                            <span className={styles.detailTitle}
                                style={{ display: "block", fontWeight: "bold", marginTop: "10px" }}
                            >Programming language:</span> {programmingLanguage}
                        </span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default MuiForm

