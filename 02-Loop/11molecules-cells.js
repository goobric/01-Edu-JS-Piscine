function RNA(DNA) {
  var RNA = '';
  for (var i = 0; i < DNA.length; i++) {
    switch (DNA[i]) {
      case 'G':
        RNA += 'C';
        break;
      case 'C':
        RNA += 'G';
        break;
      case 'T':
        RNA += 'A';
        break;
      case 'A':
        RNA += 'U';
        break;
    }
  }
  return RNA;
}

function DNA(RNA) {
  var DNA = '';
  for (var i = 0; i < RNA.length; i++) {
    switch (RNA[i]) {
      case 'C':
        DNA += 'G';
        break;
      case 'G':
        DNA += 'C';
        break;
      case 'A':
        DNA += 'T';
        break;
      case 'U':
        DNA += 'A';
        break;
    }
  }
  return DNA;
}

console.log(RNA('GCTA')); // Outputs: 'CGAU'

console.log(DNA('CGAU')); // Outputs: 'GCTA'
