export const useGetUserInfo = () => {
    // Retrieve raw data from localStorage
    const rawData = localStorage.getItem("auth");

    // Initialize default values
    let name = "";
    let profilePhoto = "";
    let userID = "";
    let isAuth = false;
    
console.log(rawData);
    // Parse raw data if it exists, otherwise use default values
    if (rawData) {
        try {
            const parsedData = JSON.parse(rawData);
            // Destructure parsed data with default values
            name = parsedData.name || "";
            profilePhoto = parsedData.profilePhoto || "";
            userID = parsedData.userID || "";
            isAuth = parsedData.isAuth || false;
        } catch (error) {
            console.error("Failed to parse auth data from localStorage:", error);
        }
    }

    return { name, profilePhoto, userID, isAuth };
};
