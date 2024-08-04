import React from 'react';
import { Link } from 'react-router-dom';
import { LinkedIn, GitHub, Instagram } from '@mui/icons-material';
import logo from '../images/brand.png';
import { motion } from "framer-motion";
import scooter from '../images/scooter.png';

const socialLinks = [
  {
    path: "https://github.com/deepakgangwr",
    icon: <GitHub className='fs-4' />
  },
  {
    path: "https://www.instagram.com/deepak_gangwr/",
    icon: <Instagram className='fs-4' />
  },
  {
    path: "https://www.linkedin.com/in/deepak-gangwar-92b498257/",
    icon: <LinkedIn className='fs-4' />
  },
];

const quickLinks01 = [
  {
    path: "/",
    display: "Home"
  },
  {
    path: "/about",
    display: "About Us"
  },
  {
    path: "/services",
    display: "Services"
  },
  {
    path: "/help",
    display: "Help"
  }
];

const quickLinks02 = [
  {
    path: "/serviceProviders",
    display: "Find a Service Provider"
  },
  {
    path: "/services",
    display: "Browse Provided Services"
  },
  {
    path: "/",
    display: "Know recent News and Updates"
  },
  {
    path: "/serviceProviders",
    display: "Get an opinion"
  }
];

const quickLinks03 = [
  {
    path: "/",
    display: "Donate"
  },
  {
    path: "/contact",
    display: "Contact Us"
  }
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='py-4 position-relative' style={{ fontSize: '1.2rem', background: 'linear-gradient(to right, green, yellowgreen)', marginTop: "3rem"}}>
      <motion.div
        className='position-absolute w-100'
        style={{ bottom: '85%', left: '0', overflow: 'hidden' }}
      >
        <motion.img
          src={scooter}
          alt="scooter"
          width={250}
          animate={{
            x: ["500%", "-100%"],
            transition: {
              duration: 7,
              repeat: Infinity,
            },
          }}
        />
      </motion.div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 d-flex flex-column justify-content-center my-2'>
            <Link to="/" className="d-flex align-items-center mb-3 text-decoration-none gap-3">
              <div>
                <img src={logo} width={50} />
              </div>
              <span className='text-white h3 iconText m-1 p-2' style={{ fontSize: '3.2rem' }}>𝑲𝒉𝒂𝒏𝒂 - 𝑲𝒉𝒂𝒋𝒂𝒏𝒂</span>
            </Link>
            <p className='text-white'>
              Copyright © {year} Developed by <span className='my-bold'>Deepak Gangwar</span>
            </p>
            <p className='text-white mt-1'>All rights reserved.</p>
            <div className='d-flex gap-3 my-3'>
              {socialLinks.map((link, index) => (
                <a
                  href={link.path}
                  key={index}
                  className='text-white p-2 border border-solid rounded-circle d-flex align-items-center justify-content-center'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className='col-md-3 my-2 col-sm-4'>
            <h5 className='text-white iconText mb-3'>I want to:</h5>
            <ul className='list-unstyled'>
              {quickLinks02.map((item, index) => (
                <li key={index} className='mb-3 list-style-none'>
                  <Link
                    to={item.path}
                    className='text-white text-decoration-none'
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='col-md-2 my-2 col-sm-4'>
            <h5 className='text-white iconText mb-3'>Quick Links</h5>
            <ul className='list-unstyled'>
              {quickLinks01.map((item, index) => (
                <li key={index} className='mb-3'>
                  <Link
                    to={item.path}
                    className='text-white text-decoration-none'
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='col-md-1 my-2 col-sm-4'>
            <h5 className='text-white iconText mb-3'>Support</h5>
            <ul className='list-unstyled'>
              {quickLinks03.map((item, index) => (
                <li key={index} className='mb-3'>
                  <Link
                    to={item.path}
                    className='text-white text-decoration-none'
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
