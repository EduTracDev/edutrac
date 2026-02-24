import React from 'react'

interface NavbarProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function Navbar({ title, description, buttonText, buttonLink }: NavbarProps) {
  return (
    <div>Navbar</div>
  )
}