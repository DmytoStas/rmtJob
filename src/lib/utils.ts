import toast from "react-hot-toast";

export const handleError = (e: unknown) => {
  let message = "An error occured.";

  if (e instanceof Error) {
    message = e.message;
  } else if (typeof e === "string") {
    message = e;
  }

  toast.error(message);
};
