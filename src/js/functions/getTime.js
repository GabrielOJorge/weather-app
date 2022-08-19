const getDateTime = () => {
  const currentDate = new Date();

  const options = { 
    month: 'short', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
    hour12: true,
  };

  const formatedDateTime = new Intl.DateTimeFormat('en-US', options).format(currentDate);

  return formatedDateTime;
}

export default getDateTime;