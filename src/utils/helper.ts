import { CSSProperties } from "react";
import { toast } from "react-toastify";

export const resolveImageURL = (path: string) => {
  if (path.startsWith("http")) return path;
  else if (path.length > 0)
    return `https://coydoe.onrender.com/images/questions/${path}`;
  else return "";
};

export const showSuccessToast = (message: string) => {
  toast.success(" " + message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const showErrorToast = (message: string = "Something is wrong!") => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const hasEmpty = function (obj: any) {
  console.log(JSON.stringify(obj));

  for (var key in obj) {
    if (
      obj[key] == null ||
      obj[key] == "" ||
      obj[key] == undefined ||
      obj[key].length < 1
    )
      return true;
  }
  return false;
};

export const isEmptyForRichText = function (obj: any, field: string) {
  if (!obj[field]) {
    return true;
  } else if (obj[field] === "<p><br></p>") {
    return true;
  }
  return false;
};

export const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};
