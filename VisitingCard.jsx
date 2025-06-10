import React from 'react';
import './VisitingCard.css';
import geo from './images/Geo.png';
import mail from './images/Mail.png';
import phone from './images/Phone.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const VisitingCard = () => {
  const [data, setData] = React.useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const downloadCard = () => {
    const card = document.getElementById('card-preview');
    html2canvas(card).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('visiting_card.pdf');
    });
  };

  return (
    <div className="row bg-light min-vh-100 p-4">
      <div className="form w-100 w-md-50 p-4 col-md-6 row">
        <h2 className="col-md-12 mb-4">💼 Business Visiting Card Generator</h2>

        <label className="col-md-3">Name</label>
        <input name="name" className="col-md-8 mb-2" onChange={handleChange} placeholder="Your Name" />

        <label className="col-md-3">Designation</label>
        <input name="desig" className="col-md-8 mb-2" onChange={handleChange} placeholder="Your Role" />

        <label className="col-md-3">Email</label>
        <input name="email" className="col-md-8 mb-2" onChange={handleChange} placeholder="Your Email" />

        <label className="col-md-3">Contact</label>
        <input name="contact" className="col-md-8 mb-2" onChange={handleChange} placeholder="Phone Number" />

        <label className="col-md-3">Company</label>
        <input name="cname" className="col-md-8 mb-2" onChange={handleChange} placeholder="Company Name" />

        <label className="col-md-3">Address</label>
        <textarea name="addr" className="col-md-8 mb-3" onChange={handleChange} placeholder="Company Address" />

        <div className="col-md-12 text-end">
          <button className="btn btn-dark px-4 py-2" onClick={downloadCard}>
            📥 Download Card
          </button>
        </div>
      </div>

      {/* CARD PREVIEW */}
      <div id="card-preview" className="visiting-card-modern shadow rounded text-dark p-4 d-flex" style={{ width: '350px', height: '200px', background: '#ffffff', position: 'relative' }}>
  {/* Accent Side Bar */}
  <div style={{ width: '8px', backgroundColor: '#007bff', borderRadius: '8px 0 0 8px' }}></div>

  {/* Main Content */}
  <div className="ps-3 d-flex flex-column justify-content-between w-100">
    <div className="d-flex justify-content-between align-items-start">
      <div>
        <h5 className="mb-1 fw-bold">{data.name || 'Your Name'}</h5>
        <p className="mb-1 text-muted">{data.desig || 'Your Designation'}</p>
      </div>
      {/* Optional Avatar */}
      <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
        👤
      </div>
    </div>

    <div>
      <p className="mb-1" style={{ fontSize: '0.85rem' }}><img src={mail} className="icon" alt="mail" /> {data.email || 'email@example.com'}</p>
      <p className="mb-1" style={{ fontSize: '0.85rem' }}><img src={phone} className="icon" alt="phone" /> {data.contact || '123-456-7890'}</p>
      <p className="mb-1" style={{ fontSize: '0.85rem' }}><img src={geo} className="icon" alt="location" /> {data.addr || 'Company Address'}</p>
    </div>

    <div className="text-end text-primary fw-semibold" style={{ fontSize: '0.9rem' }}>
      {data.cname || 'Your Company'}
    </div>
  </div>
</div>

    </div>
  );
};

export default VisitingCard;
