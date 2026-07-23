import { Request, Response } from "express";
import prisma from "../config/prisma";
import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

const uploadToCloudinary = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "future-believe/events",
      },
      (error, result) => {
        if (error) {
          console.log("Cloudinary Error:", error);
          return reject(error);
        }

        if (!result) {
          return reject(new Error("Upload Failed"));
        }

        resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};



export const createEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, description, location, date, time, price, totalTickets } =
      req.body;

    // Validation
    if (
      !title ||
      !description ||
      !location ||
      !date ||
      !time ||
      !price ||
      !totalTickets
    ) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

       const ping = await cloudinary.api.ping();
        console.log(ping);
    console.log("========== BODY ==========");
    console.log(req.body);

    console.log("========== FILE ==========");
    console.log(req.file);

    console.log("========== USER ==========");
    console.log((req as any).user);

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Event image is required",
      });
      return;
    }

    // Upload image to Cloudinary
    const imageUrl = await uploadToCloudinary(req.file.buffer);

    console.log(imageUrl)

    // Logged in Admin
    const userId = (req as any).user.id;

    // Create Event
    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        date: new Date(date),
        time,
        image: imageUrl,
        price: Number(price),
        totalTickets: Number(totalTickets),
        availableTickets: Number(totalTickets),
        isPublished: true,
        createdById: userId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error: any) {
    console.error("Create Event Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
