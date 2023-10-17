import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoginAdmin from './components/loginAdmin';
import bcrypt from "bcryptjs-react"

export default function ProtectionDashBord() {
  const { variable } = useParams<string>();
  const navigate = useNavigate();
  
  const checkVariableValidity = async (encryptedVariable: any) => {
    try {
      return await bcrypt.compare("/dashbord/admin", encryptedVariable.replace(/\-/g, '.').replace(/\_/g, '/'));
    } catch (error) {
      setIsValid(false);
    }
  };
  
  const [isValid, setIsValid] = useState<boolean | undefined>(false);
  console.log(isValid);
  useEffect(() => {
    checkVariableValidity(variable).then((isValidValue) => {
      setIsValid(isValidValue);
      if (!isValidValue) {
        navigate('/error');
      }
    });
  }, [variable, navigate]);

  return (
    <div>
      <LoginAdmin />
    </div>
  )
}
