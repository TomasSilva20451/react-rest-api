import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const SkillContext = createContext();

export const SkillProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    slug: "",
  });
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getSkills = async () => {
    const response = await axios.get("skills");
    setSkills(response.data.data);
  };

  const getSkill = async (id) => {
    const response = await axios.get("skills/" + id);
    setSkill(response.data.data);
  };

  const storeSkill = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post("skills", formValues);
  
      if (response.status === 201) {
        // The skill was successfully created, so you can redirect the user
        navigate("/skills");
      } else {
        // There was an error creating the skill
        throw new Error("Failed to store the skill");
      }
    } catch (error) {
      console.error(error);
      // TODO: handle error
    }
  };
  
  


  return (
    <SkillContext.Provider
      value={{ skill, skills, getSkill, getSkills, onChange, formValues, storeSkill, errors,  }}
    >
      {children}
    </SkillContext.Provider>
  );
};

export default SkillContext;
