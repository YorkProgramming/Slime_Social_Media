import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";



const validationSchema = yup.object().shape({
    firstName: yup.string().required("required").min(2, "must be at least 2 characters"),
    lastName: yup.string().required("required").min(2, "must be at least 2 characters"),
    email: yup.string().email("invalid email").required("required").min(6, "must be at least 6 characters"),
    password: yup.string().required("required").min(6, "must be at least 6 characters"),
    location: yup.string().required("required").min(2, "must be at least 5 characters"),
    occupation: yup.string().required("required").min(2, "must be at least 4 characters"),
    picture: yup.string().required("required"),
});



    const EditProfileForm = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");


    const updateUserProfile = async (values, userId) => {
        const formData = new FormData();
        for (let value in values) {
        formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);
    
        const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "PUT",
        body: formData,
        });
    
        const data = await response.json();
        return data;
    };
    
    const handleSubmit = async (values, onSubmitProps) => {
        try {
        await updateUserProfile(values, onSubmitProps);
        } catch (err) { 
        } 
    };

    return (
        <Box
        sx={{
            padding: "1rem 6%",
            background: "linear-gradient(45deg, #134611, #4CAF50)",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
            transition: "box-shadow 0.3s ease-in-out",
            animation: "fadeIn 0.5s ease-in-out",
            color: "white",
            "&:hover": {
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.16)",
            },
            "@keyframes fadeIn": {
                from: {
                    opacity: 0,
                },
                to: {
                    opacity: 20,
                },
            },
        }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            py={3}
            px={5}
            bgcolor="#fff"
            boxShadow="0px 3px 6px #00000029"
            borderRadius="6px"
            maxWidth="500px"
        >
        <Box gridColumn="span 4">
        <Typography variant="h4" sx={{ mb: "1rem" }}>
            Edit Profile
        </Typography>
        </Box>
        <Box gridColumn="span 4" border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" p="1rem">
            <Formik
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    location: user.location,
                    occupation: user.occupation,
                    picture: user.picture,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                }) => (
                <form onSubmit={handleSubmit}>
                    <Box display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <TextField
                        label="First Name"
                        variant="outlined"
                        size="small"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        sx={{ mr: "1rem" }}
                        />
                        <TextField
                        label="Last Name"
                        variant="outlined"
                        size="small"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                        label="Location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        name="location"
                        error={Boolean(touched.location) && Boolean(errors.location)}
                        helperText={touched.location && errors.location}
                        sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                        label="Occupation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.occupation}
                        name="occupation"
                        error={
                            Boolean(touched.occupation) && Boolean(errors.occupation)
                        }
                        helperText={touched.occupation && errors.occupation}
                        sx={{ gridColumn: "span 4" }}
                        />
                        <Box
                        gridColumn="span 4"
                        border={`1px solid ${palette.neutral.medium}`}
                        borderRadius="5px"
                        p="1rem"
                        >
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) =>
                            setFieldValue("picture", acceptedFiles[0])
                            }
                        >
                            {({ getRootProps, getInputProps }) => (
                            <Box
                                {...getRootProps()}
                                border={`2px dashed ${palette.primary.main}`}
                                p="1rem"
                                sx={{ "&:hover": { cursor: "pointer" } }}
                            >
                                <input {...getInputProps()} />
                                {!values.picture ? (
                                <p>Add Picture Here</p>
                                ) : (
                                <FlexBetween>
                                    <Typography>{values.picture.name}</Typography>
                                    <EditOutlinedIcon />
                                </FlexBetween>
                                )}
                            </Box>
                            )}
                        </Dropzone>
                        </Box>
                    </Box>
                    <Box>
                    <Button
                        type="submit"
                        sx={{
                            m: "2rem 0",
                            p: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": { color: palette.primary.main },
                        }}
                    >
                        Save
                        </Button>
                        <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            navigate(`/home`);}}
                        >
                        Cancel
                        </Button>
                    </Box>
                    </Box>
                </form>
                )}
            </Formik>
        </Box>
    </Box>

    );
};

    export default EditProfileForm;
