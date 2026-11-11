import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, ListSubheader, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';

const MuiForm = () => {
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
    const [gender, setGender] = useState("male");

    const [subject, setSubject] = useState({
        english: true,
        maths: false,
        physics: false,
    });

    const [programmingLanguage, setProgrammingLanguage] = useState("react");


    const handleSubjectChange = (event) => {
        setSubject((current) => ({ ...current, [event.target.name]: event.target.checked }));
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
        const value = event.target.value.slice(0, 40);
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const isValid = regex.test(value);
        setEmail(value);
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
            setUserNameError("Use 3 to 20 letters or numbers.");
        } else {
            setUserNameError("");
        }
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value.slice(0, 15);
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        const isValid = regex.test(value);
        setPassword(value);
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

        if (fullNameError || emailError || userNameError || passwordError || phoneNumberError || urlError) {
            toast.error("Please correct the highlighted fields.");
            return;
        }

        if (!Object.values(subject).some(Boolean)) {
            toast.error("Please select at least one subject.");
            return;
        }

        if (!resume) {
            toast.error("Please select a resume.");
            return;
        }

        handleClickOpen();
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
                        label="Full name"
                        placeholder="Full name"
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
                        onChange={event => { setUrl(event.target.value); setUrlError(event.target.validity.valid ? "" : "Enter a valid URL"); }}
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
                            className={styles.resumeInputFile}
                            type="file"
                            placeholder="select your resume"

                            onChange={event => setResume(event.target.files?.[0]?.name ?? "")}
                        />
                    </div>

                    <Select
                        className={styles.programmingLanguage}
                        aria-label="Select programming language"
                        value={programmingLanguage}
                        onChange={event => setProgrammingLanguage(event.target.value)}
                    >
                        <ListSubheader disableSticky>Language set 1</ListSubheader>
                        <MenuItem
                            value="react"
                            className={styles.language}
                        >React.js</MenuItem>
                        <MenuItem
                            value="node"
                            className={styles.language}
                        >Node.js</MenuItem>

                        <ListSubheader disableSticky>Language set 2</ListSubheader>
                        <MenuItem
                            value="express"
                            className={styles.language}
                        >Express.js</MenuItem>
                        <MenuItem
                            value="mongodb"
                            className={styles.language}
                        >MongoDB</MenuItem>
                    </Select>
                </div>

                <br /><br />
                <Button
                    variant="contained"
                    type="submit"
                    className={styles.submitButton}
                >
                    Submit
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
                    <IconButton aria-label="Close submission preview" onClick={handleClose} sx={{ float: "right", mt: -1, mr: -1 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={styles.dialogContent}>
                    <DialogContentText id="alert-dialog-description">
                        Submission preview only. No data is sent to a server, and passwords are never shown here.
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

