import { FaCarSide } from "react-icons/fa6";
import { MdFastfood } from "react-icons/md";
import { IoShirtOutline } from "react-icons/io5";

export default function ExpenseTypeIcon({ iconType }: { iconType: string }) {

    switch (iconType) {
        case "Transport":
            return <FaCarSide />
        case "Food":
            return <MdFastfood />
        case "Clothing":
            return <IoShirtOutline />
    }
}