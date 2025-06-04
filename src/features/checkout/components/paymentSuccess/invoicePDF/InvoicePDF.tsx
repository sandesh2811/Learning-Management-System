import { type UserInfoForEnrollmentType } from "@/store/enrollForm/userInfoForEnrollment";
import { type SelectedCourseType } from "@/store/selectedCourse/selectedCourse";

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        padding: 16,
    },

    header: {
        flexDirection: "column",
        textAlign: "center",
        gap: "3px",
    },

    heading: {
        fontWeight: 600,
        fontSize: "30px",
    },

    customerDetails: {
        flexDirection: "column",
        gap: "8px",
    },

    bold: {
        fontWeight: 600,
    },

    line: {
        width: "100%",
        height: "1.2px",
        backgroundColor: "black",
    },

    orderDetailsContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "15px",
        height: "300px",
    },

    orderDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        textAlign: "center",
    },

    total: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
    },

    orderProperty: {
        gap: "10px",
    },

    footer: {
        flexDirection: "column",
        gap: "8px",
        fontSize: "15px",
    },

    section: {
        margin: 10,
        padding: 20,
        flexGrow: 1,
        gap: "50px",
    },
});

interface InvoicePDFProps {
    userInfoForEnrollment: UserInfoForEnrollmentType;
    selectedCourse: SelectedCourseType;
    currentDate: string;
}

export const InvoicePDF = ({
    userInfoForEnrollment,
    selectedCourse,
    currentDate,
}: InvoicePDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Invoice</Text>

                    <View>
                        <Text style={styles.line} />
                    </View>
                </View>

                <View style={styles.customerDetails}>
                    <Text>
                        <Text style={styles.bold}>Name:</Text>
                        {userInfoForEnrollment.fullname}
                    </Text>
                    <Text>
                        <Text style={styles.bold}>Email:</Text>{" "}
                        {userInfoForEnrollment.email}
                    </Text>
                    <Text>
                        <Text style={styles.bold}>Purchase Method:</Text>{" "}
                        {userInfoForEnrollment.paymentMethod}
                    </Text>
                    <Text>
                        <Text style={styles.bold}>Purchase Date:</Text>{" "}
                        {currentDate}
                    </Text>
                    <Text>
                        <Text style={styles.bold}>Invoice Id:</Text> 123
                    </Text>
                </View>

                <View style={styles.orderDetailsContainer}>
                    <View style={styles.orderDetails}>
                        <View style={styles.orderProperty}>
                            <Text style={styles.bold}>Course Name</Text>
                            <Text>{selectedCourse.title}</Text>
                        </View>
                        <View style={styles.orderProperty}>
                            <Text style={styles.bold}>Instructor</Text>
                            <Text>{selectedCourse.instructorName}</Text>
                        </View>
                        <View style={styles.orderProperty}>
                            <Text style={styles.bold}>Price</Text>
                            <Text>{selectedCourse.price}</Text>
                        </View>
                    </View>

                    <View style={styles.total}>
                        <Text>
                            Total:
                            <Text style={styles.bold}>
                                {" "}
                                Rs {selectedCourse.price}
                            </Text>
                        </Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.line} />
                </View>
                <View style={styles.footer}>
                    <View>
                        <Text>For any queries please contact us</Text>
                    </View>
                    <View>
                        <Text>Demo Name</Text>
                        <Text>test@test.com</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);
