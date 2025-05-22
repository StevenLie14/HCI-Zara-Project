import {useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };


  return (
    <Button onClick={handleBack} variant="ghost" size="default">
        <ArrowLeft className="h-8 w-8 mr-1" /> Back
    </Button>
  );
}

export default BackButton;