function first(data){
  return data[0];
};

function last(data){
  return data[data.length-1];
};

function kiss(data){
  return [last(data), first(data)];
};

