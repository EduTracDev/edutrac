// @/modules/auth/services/authService.ts
// import { auth, db } from "@/firebase/config";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { LoginFormData, loginSchema } from "@/utils/validation";

// export const loginUser = async (
//   data: LoginFormData,
//   expectedRole: string,
//   schoolSlug: string,
// ) => {
//   try {
//     // 1. Primary Firebase Auth
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       data.email,
//       data.password,
//     );
//     const user = userCredential.user;

//     // 2. Fetch User Profile from Firestore to verify Role and School
//     const userDoc = await getDoc(doc(db, "users", user.uid));

//     if (!userDoc.exists()) {
//       throw new Error("User profile not found.");
//     }

//     const userData = userDoc.data();

//     // 3. Validation: Does the role match the portal?
//     if (userData.role !== expectedRole) {
//       await signOut(auth); // Kick them out immediately
//       throw new Error(
//         `This account is registered as a ${userData.role}, not an ${expectedRole}.`,
//       );
//     }

//     // 4. Validation: Does the school slug match?
//     if (userData.schoolSlug !== schoolSlug) {
//       await signOut(auth);
//       throw new Error("This account is not registered with this school.");
//     }

//     return userData;
//   } catch (error: "") {
//     throw error;
//   }
// };
