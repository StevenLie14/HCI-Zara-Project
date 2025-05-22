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
    <Button onClick={handleBack} variant="ghost" size="icon" className="h-8 w-8" asChild>
        <ArrowLeft className="h-4 w-4" />
    </Button>
  );
}

export default BackButton;