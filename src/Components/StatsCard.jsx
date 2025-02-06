import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Support, AttachMoney, Group } from '@mui/icons-material'; // Importing specific Material UI icons
import PersonIcon from '@mui/icons-material/Person';
import './StatsCard.css'

const statistics = [
  {
    label: 'Number of Supporters',
    value: '100+',
    icon: <PersonIcon style={{ fontSize: '40px', color: '#FF5722' }} />  // Using the actual Support icon
  },
  {
    label: 'Fund Raised',
    value: '15 Lakhs',
    icon: <AttachMoney style={{ fontSize: '40px', color: '#FF5722' }} />  // Using the AttachMoney icon
  },
  {
    label: 'People Benefited',
    value: '158',
    icon: <Group style={{ fontSize: '40px', color: '#FF5722' }} />  // Using the Group icon
  }
];

const StatsCard = () => {
  return (
    <div className="d-flex flex-column flex-lg-row gap-3" style={{ margin:'auto',display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      {statistics.map((stat, index) => (
        <Card className="statscard-card" key={index} style={{ maxWidth: 200, backgroundColor: '#343a40', color: 'white', textAlign: 'center' }}>
          <CardContent>
            {stat.icon}  {/* Rendering the icon here */}
            <Typography variant="h5" style={{ marginTop: '10px' }}>
              {stat.value}
            </Typography>
            <Typography variant="body2" style={{ marginTop: '5px' }}>
              {stat.label}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCard;
