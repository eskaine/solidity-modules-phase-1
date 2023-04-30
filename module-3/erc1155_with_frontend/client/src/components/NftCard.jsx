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
  paddingBottom: 2,
  border: '3px solid #34495E',
  borderRadius: 5
};

const mediaStyle = {
  height: 150,
  width: 150,
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

export default function NftCard({account, metadata, mintHandler}) {
  const {id, name, image, requires, amount} = metadata;

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
        {account ? <Typography sx={{ fontSize: 18 }}>
          {amount} Owned
        </Typography> : <Typography sx={{ fontSize: 18 }}>
          &nbsp;
        </Typography>}
      </CardContent>
      <CardActions>
        {account && <Button variant="contained" size="medium" onClick={() => mintHandler(id)}>Mint</Button>}
        <Button variant="outlined" size="medium">OpenSea</Button>
      </CardActions>
    </Card>
  );
}
