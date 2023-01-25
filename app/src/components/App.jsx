import React, { useEffect, useState } from 'react';
import Tabs from './tabComponent/Tabs';
import Navigation from './Navigation';
import ManagerMetricsContainer from './Managers/ManagerMetricsContainer';
import SignUp from './Authentication/SignUp';
import LogIn from './Authentication/Login';
import Loader from './tabComponent/Loader';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const App = (props) => {
  const [signUp, setSignUp] = useState(true);
  const [logIn, setLogIn] = useState(false);

  const [activeTab, setActiveTab] = useState('tab0');
  const [currentStep, setCurrentStep] = useState('Start');
  const [currentNode, setCurrentNode] = useState('');
  const [nodeTotal, setNodeTotal] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [healthStatus, setHealthStatus] = useState({ Status: 'waiting' });

  const updateNode = (node) => {
    setCurrentNode(node);
  };

  const checkLogIn = () => {
    const loggedInUser = localStorage.getItem('user');

    if (loggedInUser) {
      setSignUp(false);
      setLogIn(true);
    }
  };

  const signUpClick = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //using the inputed email and password from the user, we send their credentials to our database to be stored
    fetch(`http://localhost:3000/user/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((data) => {
      if (data.status === 200) {
        //if post request is successful, we assign signUp to false and logIn to true
        setSignUp(false);
        setLogIn(true);
        localStorage.setItem('user', true);
      } else {
        alert('The username has already been taken.');
      }
    });
  };

  const logInClick = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //using the inputed email and password provided by the user, we check to see if we have these credentials in the database
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((data) => {
      if (data.status === 200) {
        //if we confirm that this user has been signed up, we can allow them entry
        //to the developer page (by setting signUp to false and login to true)
        setSignUp(false);
        setLogIn(true);
        localStorage.setItem('user', true);
      }
    });
  };

  const logOutClick = () => {
    setSignUp(true);
    setLogIn(false);
    localStorage.clear();
  };

  const logInPage = () => {
    setSignUp(false);
  };

  const signUpPage = () => {
    setSignUp(true);
  };

  useEffect(() => {
    checkLogIn();
    setCurrentStep('IDs');
    const fetchData = async () => {
      try {
        let rawData = await fetch('/dockerCont/getTasks');
        let parsedData = await rawData.json();
        //set setTasks to equal the result of submitting a get request to the above endpoint
        setTasks(parsedData);
        //set current node to equal the first node in the swarm
        setCurrentNode(parsedData[0].nodeID);
        setLoading(true);
      } catch (err) {
        console.log('Error in App.jsx useEffect', err);
      }
    };
    fetchData();
  }, []);

  if (signUp === true) {
    return (
      <div>
        <SignUp signUpClick={signUpClick} logInPage={logInPage} />
      </div>
    );
  } else if (logIn === false) {
    return (
      <div>
        <LogIn logInClick={logInClick} signUpPage={signUpPage} />
      </div>
    );
  } else {
    return (
      <div className='navigation' id='background'>
        <Navigation logOutClick={logOutClick} />
        <div className='managerAndTabs mx-6'>
          <ManagerMetricsContainer
            activeTab={activeTab}
            currentNode={currentNode}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            healthStatus={healthStatus}
          />
          {loading ? (
            <Tabs
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              allTasks={tasks}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              currentNode={currentNode}
              setHealthStatus={setHealthStatus}
            />
          ) : (
            <Loader />
          )}
        </div>
        <div className='footer text-center'>Orcastration</div>
      </div>
    );
  }
};

export default App;
