import Loitte from "lottie-react"
import Animation from "../../../assets/Animation/Login_Image.json"

// كمبونت الذي يحتوي على صورة المتحركة
export default function Animation_Login():JSX.Element {
    return (
      <Loitte
        style={{ width: "70%", direction: "rtl" }} // تعيين التوجيه إلى RTL هنا
        animationData={Animation}
      />
    );
}
