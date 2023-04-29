import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 320,
  paddingTop: 3,
  border: '3px solid #34495E',
  borderRadius: 5
};

const mediaStyle = {
  height: 160,
  width: 160,
};

const labelStyle = {
  fontFamily: 'Ubuntu',
  fontSize: 24,
  fontWeight: 'bold',
};

const contentStyle = {
  color: '#34495E',
  textAlign: 'center'
};

export default function NftCard({name, image, requires}) {
  return (
    <Card sx={cardStyle}>
      <CardMedia
        sx={mediaStyle}
        image={image}
        title={name}
      />
      <CardContent sx={contentStyle}>
        <Typography sx={labelStyle}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
          {requires.length === 0 ? "Free" : `${requires.join(', ')}`}
        </Typography>
        <Typography sx={{ fontSize: 18 }}>
          0 Owned
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Mint</Button>
        <Button size="small">OpenSea</Button>
      </CardActions>
    </Card>
  );
}
