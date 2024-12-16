import { useState } from "react";

export const useToggle = (init_val) => {
    const [toggle, setToggle] = useState(init_val || false);

    const switchToggle = () => {
        setToggle((prev) => !prev);
    }

    return { toggle, switchToggle }
}