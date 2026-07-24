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
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};


//Create Event
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

    console.log(imageUrl);

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

// Update Event
export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      location,
      date,
      time,
      price,
      totalTickets,
      isPublished,
    } = req.body;

    // Check event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      res.status(404).json({
        success: false,
        message: "Event not found",
      });
      return;
    }

    let imageUrl = existingEvent.image;

    // Upload new image (optional)
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title: title ?? existingEvent.title,
        description: description ?? existingEvent.description,
        location: location ?? existingEvent.location,
        date: date ? new Date(date) : existingEvent.date,
        time: time ?? existingEvent.time,
        image: imageUrl,
        price: price ? Number(price) : existingEvent.price,
        totalTickets: totalTickets
          ? Number(totalTickets)
          : existingEvent.totalTickets,
        availableTickets: totalTickets
          ? Number(totalTickets)
          : existingEvent.availableTickets,
        isPublished:
          isPublished !== undefined
            ? isPublished === "true" || isPublished === true
            : existingEvent.isPublished,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error: any) {
    console.error("Update Event Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//Get All Events
export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const events = await prisma.event.findMany({
      where: {
        isPublished: true,
      },

      orderBy: {
        date: "asc",
      },

      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        date: true,
        time: true,
        image: true,
        price: true,
        totalTickets: true,
        availableTickets: true,
        isPublished: true,
        createdAt: true,

        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      totalEvents: events.length,
      data: events,
    });
  } catch (error: any) {
    console.error("Get All Events Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



//Get Single Event
export const getSingleEvent = async ( req: Request, res: Response) : Promise<void> => {
  try{
    const { id } = req.params;

    if(!id){
      res.status(400).json({
        success:false,
        message: "Event ID is Required",
      });
      return;
    }

     const event = await prisma.event.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        date: true,
        time: true,
        image: true,
        price: true,
        totalTickets: true,
        availableTickets: true,
        isPublished: true,
        createdAt: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

      if (!event) {
      res.status(404).json({
        success: false,
        message: "Event not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Event fetched successfully",
      data: event,
    });
  }catch(error){
    console.error("Get SIngle Event Error", error)
  }
}