import './styles.css';
import arrowDown from '../../assets/arrowdown.png';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function List({listItems}) {
  console.log(listItems);
  return (
    <div className="List">
        { listItems.length === 0 && (
          <p>
            No results on this page
          </p>
        ) || (
          <>

            { listItems.map(item => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`item${item.id}-content`}
                  id={`item${item.id}-header`}
                >
                  <Typography>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    { item.body }
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )) }
          </>
        )}

    </div>
  );
}

export default List;
