import { useState, useEffect } from "react";

const useProfileData = (username) => {
  const [userData, setUserData] = useState(null);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setUserExists(true);
        } else {
          setUserExists(false);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
        setUserExists(false);
      }
    };

    if (username) {
      fetchProfileData();
    } else {
      setUserExists(false);
    }
  }, [username]);

  return { userData, userExists };
};

export default useProfileData;
