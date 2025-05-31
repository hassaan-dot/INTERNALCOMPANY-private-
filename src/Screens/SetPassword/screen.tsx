import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    useWindowDimensions,
    Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as yup from "yup";
import { Password, TitleAndDescription } from "@/src/Components";
import useFormValidation from "@/src/Components/FormValidation/component";
import { useSetPassword } from "@/hooks/useSetPassword";
import styles from "./styles";
import { string } from "@/src/Resources/strings";

const passwordSchema = yup.object().shape({
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const SetPasswordScreen: React.FC = () => {
    const { code } = useLocalSearchParams();
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 850;
    const isMobileView = Platform.OS === "ios";

    const { setPassword, loading } = useSetPassword();
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [errors, setErrors] = useState({ password: "" });

    const {
        values,
        handleChange,
        handleSubmit,
        errors: errorsForm,
    } = useFormValidation({
        initialValues: { password: "" },
        validationSchema: passwordSchema,
        onSubmit: async ({ password }) => {
            if (!code || typeof code !== "string") {
                alert("Missing token");
                return;
            }

            try {
                await setPassword(code, password);
                alert("Password set successfully!");
                router.replace("/(auth)/login");
            } catch (err: any) {
                alert(err.message || "Failed to set password");
            }
        },
    });

    const validateForm = async () => {
        try {
            await passwordSchema.validate({ password: values.password }, { abortEarly: false });
            setErrors({ password: "" });
            return true;
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const errMap: typeof errors = { password: "" };
                err.inner.forEach((e) => {
                    if (e.path) errMap[e.path as keyof typeof errMap] = e.message;
                });
                setErrors(errMap);
            }
            return false;
        }
    };

    const handlePress = async () => {
        setSubmitAttempted(true);
        const valid = await validateForm();
        if (valid) handleSubmit();
    };

    return (
        <View style={[styles.container, isMobileView && styles.container2]}>
            <View style={[styles.login_desc2, isMobileView && styles.login_desc22]}>
                <View style={[styles.container3, { width: isSmallScreen ? "85%" : "65%" }]}>
                    <TitleAndDescription
                        titleTextStyle={[styles.titleTextStyle, isMobileView && styles.titleTextStyle2]}
                        textStyle={[styles.textStyle, isMobileView && styles.titleTextStyle2]}
                        subtitleContainer={[styles.subtitle, isMobileView && styles.subtitle2]}
                        title="Set Password"
                        desc="Create your password to activate your account"
                    />

                    <View style={styles.logincontainer}>
                        <Password
                            title="New Password"
                            password={values.password}
                            setPassword={(val) => handleChange("password", val)}
                            placeholder="Enter your new password"
                            inputStyle={submitAttempted && errors.password ? styles.inputError : undefined}
                            errorMessage={
                                submitAttempted && errors.password
                                    ? errors.password
                                    : values.password &&
                                        values.password.length > 0 &&
                                        values.password.length < 6
                                        ? "Password must be at least 6 characters"
                                        : undefined
                            }
                        />
                    </View>

                    <View style={styles.logincontainer}>
                        <TouchableOpacity
                            onPress={handlePress}
                            style={[styles.loginButton, isMobileView && styles.loginButton2]}
                            disabled={loading}
                        >
                            <Text style={[styles.loginText, isMobileView && styles.loginText2]}>
                                {loading ? <ActivityIndicator /> : string.Confirm}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SetPasswordScreen;
