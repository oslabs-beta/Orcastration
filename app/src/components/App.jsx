import React, { useEffect, useState } from 'react';
import Tabs from './tabComponent/Tabs';
import Navigation from './Navigation';
import ManagerMetricsContainer from './Managers/ManagerMetricsContainer';
import SignUp from './Authentication/SignUp';
import LogIn from './Authentication/Login';
import Loader from './tabComponent/Loader';

// import Data from '../TEST-DATA/Data';
// import PieChart from '../components/PieChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const App = (props) => {
  const [signUp, setSignUp] = useState(true);
  const [logIn, setLogIn] = useState(false);
  const [user, setUser] = useState(false);

  const [activeTab, setActiveTab] = useState('tab0');
  const [currentNode, setCurrentNode] = useState('');
  const [nodeTotal, setNodeTotal] = useState(0);
  const [tasks, setTasks] = useState([]); // should it be null or arr? what if use has no docker swarm set up
  const [loading, setLoading] = useState(false);

  const updateNode = (node) => {
    setCurrentNode(node);
  };

  const checkLogIn = () => {
    const loggedInUser = localStorage.getItem('user');

    if (loggedInUser) {
      // console.log('inside the conditional');
      setSignUp(false);
      setLogIn(true);
    }
  };

  const signUpClick = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    fetch(`http://localhost:3000/user/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((data) => {
      if (data.status === 200) {
        setSignUp(false);
        setLogIn(true);
        localStorage.setItem('user', true);
        // console.log(data);
      } else {
        alert('The username has already been taken.');
      }
    });
  };

  const logInClick = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((data) => {
      if (data.status === 200) {
        setSignUp(false);
        setLogIn(true);
        setUser(true);
        localStorage.setItem('user', true);
      }
    });
  };

  const logOutClick = () => {
    setUser(false);
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
    const fetchData = async () => {
      try {
        let rawData = await fetch('/dockerCont/getTasks');
        let parsedData = await rawData.json();
        // console.log('this is all tasks data: ', parsedData);
        setTasks(parsedData);
        setCurrentNode(parsedData[0].nodeID);
        setLoading(true);
      } catch (err) {
        console.log('Error in App.jsx useEffect', err);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   checkLogIn();
  //   const fetchData = async () => {
  //     try {
  //       let rawData = await fetch('/dockerCont/getTasks');
  //       let parsedData = await rawData.json();
  //       setData(parsedData);
  //       setCurrentNode(parsedData[0].nodeID);
  //       let totalPercentageCPU = 0;
  //       setCurrentNode(parsedData[0].nodeID);
  //     } catch (err) {
  //       console.log('Error in App.jsx useEffect', err);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
          />
          {loading ? (
            <Tabs
              // allTasks={data}
              allTasks={tasks}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              currentNode={currentNode}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }
};

export default App;
