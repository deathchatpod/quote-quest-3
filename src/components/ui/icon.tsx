"use client";

import { Icon as Iconify, IconProps } from "@iconify/react";

export const Icon = ({ icon, ...props }: IconProps) => (
  <Iconify icon={icon} {...props} />
);
