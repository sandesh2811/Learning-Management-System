// "use client";

// import { EnrollFormLoading } from "@/app/(checkout)/enrollForm/loading";
// import { RootState } from "@/store/Store";

// import { redirect } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// // HOC
// const AuthCheck = () => {
//     const selectedCourse = useSelector(
//         (state: RootState) => state.selectedCourse
//     );
//     const [isChecked, setChecked] = useState<boolean>(false);

//     useEffect(() => {S
//         if (selectedCourse === undefined) return;

//         Object.values(selectedCourse).map((val) => {
//             if (val === "" || val === null) {
//                 redirect("/courses");
//             } else {
//                 setChecked(true);
//             }
//         });
//     }, [selectedCourse]);

//     if (!isChecked) return <EnrollFormLoading />;

//     return <h1>Loadin....</h1>;
// };

// export default AuthCheck;
