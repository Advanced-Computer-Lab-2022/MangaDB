import React from "react";
import PrimaryButton from "../PrimaryButton";

const FAQsNavBar = (props) => {
  return (
    <li>
      <PrimaryButton className={`flex space-x-4 ${props.active ? 'underline decoration-primaryBlue font-medium decoration-4 underline-offset-8' : 'no-underline'}`}>
        <span className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-cart"
          >
            <path d="M58.66 21.85H37.21v-6.44c0-2.94-2.39-5.34-5.34-5.34l-26.53-.01C2.4 10.05 0 12.45 0 15.39v16.99c0 2.94 2.39 5.34 5.34 5.34h.99v3c0 .53.29 1.01.76 1.26a1.442 1.442 0 0 0 1.48-.07l6.27-4.19H26.8v6.45c0 2.94 2.39 5.33 5.33 5.33h17.04l6.27 4.2a1.442 1.442 0 0 0 1.48.07c.47-.25.76-.73.76-1.26v-3h.99c2.95 0 5.34-2.39 5.35-5.33V27.2c-.02-2.95-2.42-5.35-5.36-5.35zm-30.39 13H14.39c-.28 0-.56.08-.8.24l-4.4 2.94v-1.75c0-.79-.64-1.43-1.43-1.43H5.34c-1.36 0-2.47-1.11-2.47-2.47V15.39c0-1.36 1.11-2.47 2.47-2.47l26.53.01c1.36 0 2.47 1.11 2.47 2.47v16.98c0 1.36-1.11 2.47-2.47 2.47h-3.6zm32.86 9.33c0 1.36-1.11 2.47-2.48 2.47h-2.42c-.79 0-1.43.64-1.43 1.43v1.75l-4.4-2.95c-.24-.16-.51-.24-.8-.24H32.12c-1.36 0-2.47-1.11-2.47-2.47v-6.45h2.21c2.94 0 5.34-2.39 5.34-5.34V24.7h21.45a2.48 2.48 0 0 1 2.48 2.48v17z" />
            <path d="M23.36 27.96a.574.574 0 0 0-.22-.12c-.09-.03-.22-.08-.38-.15-.16-.07-.35-.17-.59-.31-.23-.14-.5-.34-.8-.6.2-.2.38-.43.53-.69.16-.26.29-.55.39-.87.11-.32.19-.66.24-1.03.06-.37.08-.77.08-1.19 0-.82-.1-1.52-.29-2.12-.19-.6-.47-1.09-.85-1.48-.37-.39-.83-.68-1.37-.87-.54-.19-1.17-.28-1.87-.28-.75 0-1.41.11-1.97.34-.57.23-1.04.56-1.43.98-.38.43-.67.94-.87 1.55-.19.61-.29 1.3-.29 2.06 0 .84.09 1.57.27 2.18.18.61.46 1.11.82 1.51.36.39.82.68 1.37.87.55.19 1.19.28 1.92.28.39 0 .74-.04 1.06-.11.32-.08.59-.16.81-.27.27.31.56.58.87.81.31.24.62.44.92.6.3.16.58.29.84.38.26.09.47.13.63.13.04 0 .08-.01.11-.03.03-.02.07-.05.09-.11a.96.96 0 0 0 .07-.25c.02-.11.03-.25.03-.42 0-.22-.01-.39-.04-.51s-.02-.23-.08-.28zm-2.87-3.57c-.08.4-.22.76-.41 1.06-.19.3-.45.54-.77.71-.32.18-.71.26-1.18.26s-.86-.08-1.17-.23c-.31-.15-.56-.38-.74-.67a2.89 2.89 0 0 1-.39-1.06 7.38 7.38 0 0 1-.12-1.4c0-.44.04-.85.12-1.25.08-.4.22-.74.41-1.04.19-.3.45-.53.77-.71.32-.18.71-.26 1.18-.26s.86.08 1.17.24c.31.16.56.38.75.67.19.29.32.64.4 1.04.08.4.12.85.12 1.34-.01.46-.06.89-.14 1.3zm26.29 6.59a.704.704 0 0 0-.11-.23c-.04-.06-.12-.1-.22-.13a1.5 1.5 0 0 0-.42-.05c-.18-.01-.42-.01-.73-.01-.26 0-.47 0-.63.01-.16.01-.28.03-.37.05-.09.03-.16.07-.2.12-.04.05-.08.12-.11.21l-3.08 8.86c-.06.18-.1.32-.12.43-.02.11 0 .19.05.25s.14.1.28.11c.13.02.32.02.56.02.22 0 .4-.01.54-.02s.24-.03.32-.06c.07-.03.13-.07.16-.12a.75.75 0 0 0 .08-.18l.63-1.95h3.75l.67 2.01c.02.07.05.12.08.16s.08.07.16.1c.08.02.19.04.34.05.15.01.35.01.61.01.25 0 .45-.01.59-.02.14-.01.24-.05.3-.1s.08-.13.06-.24a2.5 2.5 0 0 0-.12-.44l-3.07-8.84zm-2.91 5.77 1.41-4.24h.01l1.41 4.24h-2.83z" />
          </svg>
        </span>
        <span>FAQs</span>
      </PrimaryButton>
    </li>
  );
};

export default FAQsNavBar;