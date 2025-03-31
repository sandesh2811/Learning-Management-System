import React from "react";

import {
    AiFillLinkedin,
    AiFillTwitterSquare,
    AiFillFacebook,
    AiFillMail,
    AiFillPhone,
    AiFillEnvironment,
} from "react-icons/ai";

const Contacts = [
    {
        name: "demo@gmail.com",
        logo: <AiFillMail />,
    },
    {
        name: "0123456789",
        logo: <AiFillPhone />,
    },
    {
        name: "Kathmandu , Nepal",
        logo: <AiFillEnvironment />,
    },
];

const Socials = [
    {
        name: "LinkedIn",
        logo: <AiFillLinkedin />,
    },
    {
        name: "Twitter",
        logo: <AiFillTwitterSquare />,
    },
    {
        name: "Facebook",
        logo: <AiFillFacebook />,
    },
];

const QuickLinks = ["Privacy Policy", "FAQs", "Terms & Conditions"];

const Footer = () => {
    return (
        <footer className="mt-16 flex h-[20vh] items-center justify-between">
            <ContactInfo />
            <SocialsInfo />
            <QuickLinksInfo />
        </footer>
    );
};

export default Footer;

const Base = ({
    children,
    type,
}: {
    children: React.ReactNode;
    type: string;
}) => {
    return (
        <div className="flex flex-col gap-1">
            <h4 className="text-xl font-medium tracking-wide">{type}</h4>
            <div>{children}</div>
        </div>
    );
};

const ContactInfo = () => {
    return (
        <Base type="Contact">
            {Contacts.map((contact) => (
                <span key={contact.name} className="flex items-center gap-1">
                    {contact.logo} : {contact.name}
                </span>
            ))}
        </Base>
    );
};

const SocialsInfo = () => {
    return (
        <Base type="Socials">
            {Socials.map((social) => (
                <span
                    key={social.name}
                    className="flex cursor-pointer items-center gap-1"
                >
                    {social.logo} : {social.name}
                </span>
            ))}
        </Base>
    );
};

const QuickLinksInfo = () => {
    return (
        <Base type="Quick Links">
            {QuickLinks.map((link) => (
                <span
                    key={link}
                    className="flex cursor-pointer items-center gap-1"
                >
                    {link}
                </span>
            ))}
        </Base>
    );
};
